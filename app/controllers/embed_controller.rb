class EmbedController < ApplicationController

  def info
    @external_id = params[:id]
    @head = @external_id ? Head.find_by_external_id(@external_id) : Head.random_default
    @easy_setup = easy_setup
    @master_setup = init_script_tag
    @advanced_js = advanced_js
  end

  private

  def easy_setup
    tag = <<-HTML
    #{init_script_tag}<script>#{easy_setup_js}</script>
    HTML

    tag.chomp
  end

  def easy_setup_js
    <<-JAVASCRIPT
    document.addEventListener("DOMContentLoaded",function(){(new Friendheads('#{@head.external_id}')).add();});
    JAVASCRIPT
  end

  def init_script_tag
    <<-HTML
    <script src="http://www.friendheads.com/js/embed.js"></script>
    HTML
  end

  def advanced_js
    <<-JAVASCRIPT
      var friendheads = new Friendheads('#{@head.external_id}');

      friendheads.add(); // add one head
      friendheads.add(7); // add 7 head
      friendheads.add(-2); // remove 2 heads

      friendheads.count(); // get head count
      friendheads.count(5); // set head count

      friendheads.destroy(); // remove instance from dom
    JAVASCRIPT
  end

end
