class CommentsController < ApplicationController

    def create
        comment=Comment.create(comment_params)
        byebug
        render json: comment
    end

    private

    def comment_params
        params.permit(:id, :user_id, :post_id, :content)
    end
end
