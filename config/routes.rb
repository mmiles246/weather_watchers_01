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
  post '/login', to: 'session#create'
  post '/create_post', to: 'posts#create'
  post '/add_location', to: 'locations#create'
  post '/new_user', to: 'users#create'

  post '/like-image', to: 'post_likes#like_image'

  post '/post-comment', to: 'comments#create'

  patch '/update_user/:id', to: 'users#avatar_upload'
  
  get '/location-images/:place_id', to: 'posts#current_location_posts'
  get '/dummy-route', to: 'posts#index'

  get '/user/:id', to: 'users#show'

  get 'user-who-posted/:id', to: 'users#find_user'

  get '/clicked_image/:id', to: 'posts#show'
  get '/image-comments/:id', to: 'comments#image_comments'
  get '/posts_latest', to: 'posts#latest'
  get '/posts_show', to: 'posts#show'
  get '/my_posts', to: 'posts#current_user_posts'
  get '/users_posts/:id', to: 'posts#users_posts'
  get '/locations', to: 'locations#place_id'
  get '/locations-placeids', to: 'locations#place_id'
  # get '/locations-images', to: 'locations#images'
  delete '/logout', to: 'session#destroy'

  delete '/unlike-image/:post_id', to: 'post_likes#destroy'



  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
  
end
