class PostLikesController < ApplicationController

    def like_image
        @like=PostLike.new(like_params)
        if @like.save
            render json: @like, status: :created
        else
            render json: @like.errors, status: :unprocessable_entity
        end        
    end



    private 

    def like_params
        params.permit(:id, :user_id, :post_id)
    end

end
