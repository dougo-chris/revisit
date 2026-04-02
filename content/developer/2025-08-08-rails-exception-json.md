---
title: "Rails Exception Reporting with JSON"
tag: "ruby"
date: "2025-08-08"
description: "How do you return the exception to the UI in a Rails project"
---

The Rails project I'm working on contains a significant amount of legacy code, which frequently triggers exceptions. This is an ongoing issue we have to tolerate until we can carry out a major refactor.

Currently, exceptions are logged and trigger automated email alerts. However, in most cases, it's the users who notify us that something has gone wrong.

The problem is that end users only see a generic "Internal Server Error" message, which provides no insight into the cause of the failure.

To improve this, you can modify the Rails server to send the error trace directly to the user. Note: If the application is externally facing, this approach raises concerns about exposing sensitive data.

When our UI receives an error response, we can enhance the user experience by displaying more detailed information about the failure.

```ruby
# app/lib/custom_exception.rb
class CustomException
  def call(env)
    exception = env['action_dispatch.exception']

    request = ActionDispatch::Request.new(env)
    status = request.path_info[1..-1].to_i
    begin
      content_type = request.formats.first
    rescue ActionDispatch::Http::MimeNegotiation::InvalidType
      content_type = Mime[:text]
    end

    if request.format.json?
      body = {
        status: :internal_server_error,
        message: exception.message,
        trace: exception.backtrace
      }.to_json
    else
      body = "<html><pre><code>#{exception.message}\n\n#{exception.backtrace.join("\n")}</code></pre><html>"
    end

    [
      status,
      {
        Rack::CONTENT_TYPE => "#{content_type}; charset=#{ActionDispatch::Response.default_charset}",
        Rack::CONTENT_LENGTH => body.bytesize.to_s
      },
      [body]
    ]
  end
end
```

```ruby
# config/application.rb
config.consider_all_requests_local = false
config.exceptions_app = ->(env) {
  CustomException.new().call(env)
}
```
