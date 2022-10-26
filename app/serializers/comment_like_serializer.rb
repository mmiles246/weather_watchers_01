class CommentLikeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :comment_id
  # has_one :user
  # has_one :comment
end
