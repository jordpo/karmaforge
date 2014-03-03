KarmaForge::Application.routes.draw do
  devise_for :users, controllers: {omniauth_callbacks: 'omniauth_callbacks'}
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  root to: 'dashboard#index'
end
