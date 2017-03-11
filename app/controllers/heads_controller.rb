class HeadsController < ApplicationController
  def index
    @head = Head.random_default
  end

  def show
    @embeded = !!params[:embeded]
    @head = Head.find_by(external_id: params[:id]) or raise ActionController::RoutingError.new(404)
  end

  def create
    h = Head.create!(head_params)
    render json: {id: h.external_id}
  end

  private

  def head_params
    params.require(:head).permit(:data_url, :background_data_url, :options)
  end
end
