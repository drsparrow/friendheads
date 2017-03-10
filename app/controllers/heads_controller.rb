class HeadsController < ApplicationController
  def index
    @head = Head.random_default
  end

  def show
    @head = Head.find_by(external_id: params[:id]) or redirect_to_not_found
  end

  def create
    h = Head.create!(head_params)
    render json: {id: h.external_id}
  end

  private

  def head_params
    params.require(:head).permit(:data_url, :background_data_url, :options)
  end

  def redirect_to_not_found
    redirect_to '/_404_'
  end
end
