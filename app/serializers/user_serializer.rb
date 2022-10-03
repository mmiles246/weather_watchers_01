class UserSerializer 
  include JSONAPI::Serializer
  attributes :id, :location_id, :username, :password, :email, :avatar, :avatar_url
end
