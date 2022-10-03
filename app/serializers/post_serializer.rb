class PostSerializer 
  include JSONAPI::Serializer
  attributes :id, :user_id, :location_id, :image, :user, :image_url, :post_likes
  # has_one :user
  # has_one :location
end
