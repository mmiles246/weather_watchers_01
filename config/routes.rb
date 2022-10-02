Rails.application.routes.draw do
  resources :comment_likes
  resources :post_likes
  resources :comments
  resources :posts
  resources :users
  resources :locations
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
