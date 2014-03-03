# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'
require 'rspec/autorun'
# require 'capybara/rails'
# require 'capybara/rspec'
require 'simplecov'
require 'capybara/poltergeist'
require 'capybara/rspec'

SimpleCov.start 'rails'
Capybara.javascript_driver = :poltergeist

Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

ActiveRecord::Migration.check_pending! if defined?(ActiveRecord::Migration)

FactoryGirl.lint

RSpec.configure do |config|
 config.include FactoryGirl::Syntax::Methods
<<<<<<< HEAD
 config.include SessionHelpers

=======
 # config.include SessionHelpers
>>>>>>> 38900416d6ef943af8e0de210647650dfd23388d
 config.use_transactional_fixtures = false
 config.infer_base_class_for_anonymous_controllers = false

 config.order = 'random'
 config.treat_symbols_as_metadata_keys_with_true_values = true
end
