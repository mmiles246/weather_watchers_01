class CommentsController < ApplicationController

    def create
        comment=Comment.create(comment_params)
        render json: comment
    end

    def image_comments
        # image=Post.find_by(id: params[:id])
        image_comments=Comment.where(post_id: params[:id])
        render json: image_comments
    end

    private

    def comment_params
        params.permit(:id, :user_id, :post_id, :content)
    end
end
