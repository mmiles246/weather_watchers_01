class ApplicationController < ActionController::API
    include ActionController::Cookies

    def show
        if current_user
            render json: UserSerializer.new(@current_user).serializable_hash[:data][:attributes]
        else
            render json: {}, status: :unauthorized
        end
end 

private

def current_user
    @current_user ||= session[:user_id]&&
    User.find_by_id(session[:user_id])
end

end
