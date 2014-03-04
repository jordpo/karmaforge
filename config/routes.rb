KarmaForge::Application.routes.draw do
  devise_for :users, controllers: {omniauth_callbacks: 'omniauth_callbacks'}
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  root to: 'dashboard#index'
  resources :locations, only: [:create]
  resources :items, only: [:create]
  resources :transactions, only: [:index, :create]
end
