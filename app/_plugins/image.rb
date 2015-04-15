module Jekyll
  class ImageTag < Liquid::Tag

    def initialize(tag_name, text, tokens)

      @params = text[1..-3].split('" "')
      @url = @params[0]
      @type = @params[1]
      @description = @params[2]
      @alt = @params[3]

    end

    def render(context)
      "<div class='image-wrapper image-#{@type}'><figure class='image'><img src='/resources/img/#{@url}' alt='#{@alt}' title='#{@alt}'><figcaption class='image-caption'>#{@description}</figcaption></figure></div>"
    end
  end
end

Liquid::Template.register_tag('image', Jekyll::ImageTag)