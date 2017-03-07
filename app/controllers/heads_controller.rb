class HeadsController < ApplicationController
  def index
    # render text: 'hi'
  end
  require 'RMagick'

  include Magick
  def show
    background = Magick::Image.read("http://pngimg.com/uploads/water/water_PNG3290.png").first
    overlay = Magick::Image.read("https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png").first
    # debugger

    height = background.rows
    width = background.columns
    ratio = (overlay.rows/overlay.columns)
    third = (width/3.0).to_i
    hh = (third*(overlay.rows/overlay.columns.to_f)).to_i
    # debugger

    overlay = overlay.adaptive_resize(third, hh)

    # background = background.adaptive_resize(width,800 )
    background.composite!(overlay, 0, 0, Magick::OverCompositeOp)
    background.composite!(overlay, third, height/2, Magick::OverCompositeOp)
    background.composite!(overlay, 2*third, height/4, Magick::OverCompositeOp)
    send_data background.to_blob, :type => 'image/png', :disposition => 'inline'
  end
end
