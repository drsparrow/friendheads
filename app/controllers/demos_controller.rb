class DemosController < ApplicationController

  def index
    @external_id = params[:head]
    @head = @external_id ? Head.find_by_external_id(@external_id) : Head.random_default
    set_ivars
    render :index, layout: 'demo'
  end

  def show
    @external_id = params[:head] || Head::DEFAULT_HEADS.sample
    render params[:id], layout: 'demo'
  end

  private

  def set_ivars
    @easy_setup = easy_setup
    @master_setup = init_script_tag
    @advanced_js = advanced_js
    @head_id_message = head_id_message
  end

  def easy_setup
    tag = <<-HTML.gsub(/^\s+/, "").chomp
    #{init_script_tag}<script>#{easy_setup_js}</script>
    HTML

    tag.chomp
  end

  def easy_setup_js
    <<-JAVASCRIPT.gsub( /^\s+/, "").chomp
    document.addEventListener("DOMContentLoaded",function(){(new Friendheads('#{@head.external_id}')).add();});
    JAVASCRIPT
  end

  def init_script_tag
    <<-HTML.gsub( /^\s+/, "").chomp
    <script src="http://www.friendheads.com/js/embed.js"></script>
    HTML
  end

  def advanced_js
    js = <<-JAVASCRIPT.gsub( /^\s+/, "")
      var friendheads = new Friendheads('#{@head.external_id}'); // #{head_id_message}
    JAVASCRIPT

    js += "\n" + <<-JAVASCRIPT.gsub( /^\s+/, "")
      friendheads.add(); // add one head
      friendheads.add(7); // add 7 head
      friendheads.add(-2); // remove 2 heads
    JAVASCRIPT

    js += "\n" + <<-JAVASCRIPT.gsub( /^\s+/, "")
      friendheads.count(); // get head count
      friendheads.count(5); // set head count
    JAVASCRIPT

    js += "\n" + <<-JAVASCRIPT.gsub( /^\s+/, "")
      friendheads.destroy(); // remove instance from dom
    JAVASCRIPT
  end

  def head_id_message
    if @external_id
      "'#{@external_id}' is your head's id"
    else
      "replace '#{@head.external_id}' with your head's id"
    end
  end

end
