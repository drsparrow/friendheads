class HeadImagesController < ApplicationController
  before_filter :find_head

  def head_og_image
    if @head.og_to_blob
      send_data @head.og_to_blob, type: 'image/png', disposition: 'inline'
    else
      redirect_to '/images/og_image.png'
    end
  end

  def update
    unless @head.og_data_url
      @head.update_attribute(:og_data_url, params[:og_image])
    end
    head(:ok)
  end

  def head_image
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

  def find_head
    @head = Head.find_by_external_id(params[:id])
  end
end
