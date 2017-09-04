$(document).ready ->

  ## Header hamburger icon ##

  $('#header__icon').click (e) ->
    e.preventDefault()
    $('body').toggleClass 'with--sidebar'
    return

  $('#site-cache').click (e) ->
    $('body').removeClass 'with--sidebar'
    return

  ## Alert message ##

  $('.close').click ->
    $(this).parent().fadeOut()
    return

  ## Home Slider ##

  if $('#home__slider').length
    $('#home__slider').slick
      speed: 800
      autoplay: true
      dots: true
      pauseOnDotsHover: true
      dotsClass: 'slider-dots'
      prevArrow: '<button type="button" class="slider-prev"><i class="fa fa-arrow-left"></i></button>'
      nextArrow: '<button type="button" class="slider-next"><i class="fa fa-arrow-right"></i></button>'
  	return
