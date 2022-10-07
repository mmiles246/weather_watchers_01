class PostLike < ApplicationRecord
  include ActiveModel::Serializers::JSON
  
  belongs_to :user
  belongs_to :post
end
