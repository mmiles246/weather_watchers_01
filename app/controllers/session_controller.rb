class SessionController < ApplicationController

    def create
        @@current_user=User.find_by_username(params[:username])
            if @@current_user&.authenticate(params[:password])
                session[:user_id]=@@current_user.id
                render json: @@current_user, status: :ok
            else
                render json: {error: "Invalid email or password"}, status: :unauthorized
            end
    end

    def destroy
        session.delete(:user_id)
        head :no_content
    end
    
end
