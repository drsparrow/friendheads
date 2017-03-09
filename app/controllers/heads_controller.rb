class HeadsController < ApplicationController
  def index
  end

  def show
  end

  def create
    Head.create!(head_params)
    head :ok
  end

  require 'RMagick'

  include Magick
  include ActionView::Helpers::AssetUrlHelper
  def head_image
    background = Magick::ImageList.new
    u = open "#{Rails.root}/public/images/blank.png"
    background.from_blob(u.read)
    @overlay = Magick::ImageList.new
    if params[:sample]
      u = open "#{Rails.root}/app/assets/images/heads/#{params[:id]}.png"
    else
      u = open "https://firebasestorage.googleapis.com/v0/b/friendheads-54fc9.appspot.com/o/#{params[:id]}?alt=media"
    end
    overlay.from_blob(u.read)

    height = background.rows
    width = background.columns.to_f

    half = width/2
    third = width/3
    fourth = width/4
    fifth = width/5

    background.composite!(get_overlay(third), 0, 0, Magick::OverCompositeOp)
    background.composite!(get_overlay(fourth), third - third/10, height/2, Magick::OverCompositeOp)
    background.composite!(get_overlay(third), 2*third, height/4, Magick::OverCompositeOp)
    background.composite!(get_overlay(fifth), half, height/20, Magick::OverCompositeOp)
    send_data background.to_blob, :type => 'image/png', :disposition => 'inline'
  end

  private

  attr_reader :overlay

  def get_overlay(w)
    w = w.to_i
    h = (w*(overlay.rows/overlay.columns.to_f)).to_i
    overlay.adaptive_resize(w, h)
  end

  def head_params
    params.require(:head).permit(:data_url)
  end
end
