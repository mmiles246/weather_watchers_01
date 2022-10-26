class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :user, :users_who_liked
  has_one :user
  has_one :post
end
