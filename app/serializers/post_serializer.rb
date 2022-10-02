class PostSerializer < ActiveModel::Serializer
  include JSONAPI::Serializer
  attributes :id, :user_id, :location_id, :image, :created_at, :user, :image_url, :caption
  # has_one :user
  # has_one :location
end
