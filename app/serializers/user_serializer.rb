class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password_digest, :bio
  has_one :location
end
