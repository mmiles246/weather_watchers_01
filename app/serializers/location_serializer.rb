class LocationSerializer < ActiveModel::Serializer
  include JSONAPI::Serializer
  attributes :id, :place_id, :name, :posts, :users
end
