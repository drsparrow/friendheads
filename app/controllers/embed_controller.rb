class EmbedController < ApplicationController

  def info
    @external_id = params[:id]
    @head = @external_id ? Head.find_by_external_id(@external_id) : Head.random_default
    @easy_setup = easy_setup
    @master_setup = master_setup
    @add_head_js = add_head_js
  end

  private

  def both_script_tags
    min_js = add_head_after_wait_js.gsub(/\s+/, "")

    <<-HTML
      #{first_script_tag}<script>#{min_js}</script>
    HTML
  end

  def setup_widget_js
    <<-JAVASCRIPT
      FriendheadsWidget.headId = '#{@head.external_id}';
    JAVASCRIPT
  end

  def easy_setup
    min_js = (setup_widget_js + add_head_after_wait_js).gsub(/\s+/, "")
    tag = <<-HTML
      <script src="http://www.friendheads.com/js/embed.js"></script><script>#{min_js}</script>
    HTML

    tag.chomp
  end

  def master_setup
    tag = <<-HTML
      <script src="http://www.friendheads.com/js/embed.js"></script><script>#{setup_widget_js.gsub(/\s+/, "")}</script>
    HTML

    tag.chomp
  end

  def add_head_after_wait_js
    <<-JAVASCRIPT
      document.addEventListener("DOMContentLoaded", function () {
        #{add_head_js}
      });
    JAVASCRIPT
  end

  def add_head_js
    <<-JAVASCRIPT
      FriendheadsWidget.add()
    JAVASCRIPT
  end

end
