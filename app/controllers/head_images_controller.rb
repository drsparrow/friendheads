class HeadImagesController < ApplicationController
  require 'RMagick'

  include Magick
  include ActionView::Helpers::AssetUrlHelper
  def head_og_image
    background = Magick::ImageList.new
    u = open "#{Rails.root}/public/images/blank.png"
    background.from_blob(u.read)
    @overlay = Magick::ImageList.new

    @head = Head.find_by_external_id(params[:id])
    overlay.from_blob(@head.to_blob)

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

  def head_image
    @head = Head.find_by_external_id(params[:id])
    send_data @head.to_blob, :type => 'image/png',:disposition => 'inline'
  end

  def head_background_image
    @head = Head.find_by_external_id(params[:id])
    blob = @head.background_to_blob
    if blob
      send_data blob, :type => 'image/png',:disposition => 'inline'
    else
      head :ok
    end
  end

  private

  attr_reader :overlay

  def get_overlay(w)
    w = w.to_i
    h = (w*(overlay.rows/overlay.columns.to_f)).to_i
    overlay.adaptive_resize(w, h)
  end
end