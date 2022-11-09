class PostsController < ApplicationController

    def index
        @posts=Post.all
        byebug
        render json: @posts
    end
    
    def show
        @post=Post.find_by_id(params[:id])
        render json: PostSerializer.new(@post).serializable_hash[:data][:attributes]
    end

    def create
        @post = Post.new(post_params)
        if @post.save
            render json: @post, status: :created
        else 
            render json: @post.errors, status: :unprocessable_entity
        end
    end

    def like
        @liked_image=Post.find_by_id(params[:id])
        byebug
    end

    def current_user_posts
        @current_user = User.find(session[:user_id])
        @my_posts=@current_user.posts
        @post_links=Array.new
        @my_posts.each do |post|
            @post_links.push(PostSerializer.new(post).serializable_hash[:data][:attributes])
        end
        render json: @post_links
    end

    def users_posts
        user = User.find_by(id: params[:id])
        user_posts=user.posts
        post_links=Array.new
        user_posts.each do |post|
            post_links.push(PostSerializer.new(post).serializable_hash[:data][:attributes])
        end
        render json: post_links
    end

    def current_location_posts
        @current_location=Location.find_by(place_id: params[:place_id])
        @loc_posts=@current_location.posts
        @loc_posts_urls=Array.new
        @loc_posts.each do |post|
            @loc_posts_urls.push(PostSerializer.new(post).serializable_hash[:data][:attributes])
        end
        # byebug
        render json: @loc_posts_urls
    end

    def todays_top
        todays_top_posts=Post.where("DATE(created_at) >= DATE(?)", Date.today)
        ttp_urls=Array.new
        todays_top_posts.each do |post|
            ttp_urls.push(PostSerializer.new(post).serializable_hash[:data][:attributes])
        end
        render json: ttp_urls
    end


    def destroy
        @post.destroy
      end

    private

    def set_user
        @current_user = User.find(params[:id])
      end

    def post_params
        params.permit(:id, :user_id, :location_id, :image, :image_url, :caption, :post_likes, :user)
    end
    
end
