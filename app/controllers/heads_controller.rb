class HeadsController < ApplicationController
  def index
  end

  def show
  end

  require 'RMagick'

  include Magick
  include ActionView::Helpers::AssetUrlHelper
  def head_image
    u = "https://firebasestorage.googleapis.com/v0/b/friendheads-54fc9.appspot.com/o/blank.png?alt=media"
    background = Magick::Image.read(u).first
    u = "https://firebasestorage.googleapis.com/v0/b/friendheads-54fc9.appspot.com/o/#{params[:id]}?alt=media"
    @overlay = Magick::Image.read(u).first

    height = background.rows
    width = background.columns.to_f

    half = width/2
    third = width/3
    fifth = width/5

    background.composite!(get_overlay(third), 0, 0, Magick::OverCompositeOp)
    background.composite!(get_overlay(fifth), third, height/2, Magick::OverCompositeOp)
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
end
