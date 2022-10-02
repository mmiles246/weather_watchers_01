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

  get '/me', to:'application#show'
  post '/login', to: 'sessions#create'
  post '/create_post', to: 'posts#create'
  post '/add_location', to: 'locations#create'
  post '/new_user', to: 'users#create'

  post '/like-image/:id', to: 'likes#like_image'

  patch '/update_user/:id', to: 'users#avatar_upload'
  
  get '/location-placeId/:place_id', to: 'posts#current_location_posts'
  get '/dummy-route', to: 'posts#index'

  get '/clicked_image/:id', to: 'posts#show'
  get '/posts_latest', to: 'posts#latest'
  get '/posts_show', to: 'posts#show'
  get '/my_posts', to: 'posts#current_user_posts'
  get '/location', to: 'locations#place_id'
  get '/locations-placeids', to: 'locations#place_id'
  get 'locations-images', to: 'locations#images'
  delete '/logout', to: 'sessions#destroy'
  
end
