module Jekyll
  class ImageTag < Liquid::Tag

    def initialize(tag_name, text, tokens)

      @params = text[1..-3].split('" "')
      @url = @params[0]
      @type = @params[1]
      @description = @params[2]
      @alt = @params[3]
      @prefix = ''
      @suffix = ''
      @html = "<figure class='image image-#{@type}'><img src='/resources/img/#{@url}' alt='#{@alt}' title='#{@alt}'><figcaption class='image-caption'>#{@description}</figcaption></figure>"

      if @type == 'left' or @type == 'center'
        @prefix = "<div class='image-wrapper'>"
      end
      
      if @type == 'right' or @type == 'center'
        @suffix = "</div>"
      end
    end

    def render(context)
      "#{@prefix}#{@html}#{@suffix}"
    end
  end
end

Liquid::Template.register_tag('image', Jekyll::ImageTag)