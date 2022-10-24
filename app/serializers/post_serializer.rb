class PostSerializer
  include JSONAPI::Serializer
  attributes :id, :user_id, :location_id, :image, :user, :image_url, :post_likes, :users_that_liked, :users_who_liked, :comments, :date_posted, :time_posted, :created_at
  has_one :user
  has_one :location

  # has_many :post_likes

end
