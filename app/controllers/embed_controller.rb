class EmbedController < ApplicationController

  def info
    @external_id = params[:id]
    @head = @external_id ? Head.find_by_external_id(@external_id) : Head.random_default
    @both_script_tags = both_script_tags
    @first_script_tag = first_script_tag
    @add_head_js = add_head_js
  end

  private

  def both_script_tags
    min_js = add_head_after_wait.gsub(/\s+/, "")

    <<-HTML
      #{first_script_tag}<script>#{min_js}</script>
    HTML
  end

  def first_script_tag
    tag = <<-HTML
      <script src="http://www.friendheads.com/js/embed.js"></script>
    HTML

    tag.chomp
  end

  def add_head_after_wait
    <<-JAVASCRIPT
      document.addEventListener("DOMContentLoaded", function () {
        #{add_head_js}
      });
    JAVASCRIPT
  end

  def add_head_js
    <<-JAVASCRIPT
      FriendheadsWidget.add('#{@head.external_id}')
    JAVASCRIPT
  end

end
