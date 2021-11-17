var searchKeyword1 = ""
var searchKeyword2 = ""
var searchKeyword3 = ""
var searchKeyword4 = ""
var searchKeyword5 = ""
var searchKeyword6 = ""

$(document).ready(function() {
    console.log("ready!")
        //Sets Tag text based on primary Tag press
        //TODO: use arrays to simplify code
    $("#primaryTag1").click(function() {
        console.log('primaryTag1')
        $("#primaryTag1").toggleClass('on')
        $("#primaryTag2, #primaryTag3").removeClass('on')

        $('#secondaryTag1').children().text("Painting")
        $('#secondaryTag2').children().text("Crochet")
        $('#secondaryTag3').children().text("Music")
        $('#secondaryTag4').children().text("Creative Writing")
        $('#secondaryTag5').toggle(true).children().text("Coding")
        $('#secondaryTag6').toggle(true).children().text("Digital Art")
    });
    $("#primaryTag2").click(function() {
        console.log('primaryTag2')
        $('#primaryTag2').toggleClass('on')
        $("#primaryTag1, #primaryTag3").removeClass('on')

        $('#secondaryTag1').children().text("Team building")
        $('#secondaryTag2').children().text("Management")
        $('#secondaryTag3').children().text("Customer Service")
        $('#secondaryTag4').children().text("Time Management")
        $('#secondaryTag5').toggle(false).children().text("")
        $('#secondaryTag6').toggle(false).children().text("")
    });
    $("#primaryTag3").click(function() {
        console.log('primaryTag3')
        $('#primaryTag3').toggleClass('on')
        $("#primaryTag1, #primaryTag2").removeClass('on')

        $('#secondaryTag1').children().text("Essays")
        $('#secondaryTag2').children().text("Studying")
        $('#secondaryTag3').children().text("Testing")
        $('#secondaryTag4').children().text("Time Management")
        $('#secondaryTag5').toggle(false).children().text("")
        $('#secondaryTag6').toggle(false).children().text("")
    });

    //Sets keywords for search in settings
    $('#secondaryTag1').click(function() {
        if ($('#primaryTag1').hasClass('on')) {
            searchKeyword1 = "%20painting"
            console.log(searchKeyword1)
            return
        }
        if ($('#primaryTag2').hasClass('on')) {
            searchKeyword1 = "%20team building"
            console.log(searchKeyword1)
            return
        }
        if ($('#primaryTag3').hasClass('on')) {
            searchKeyword1 = "%20essays"
            console.log(searchKeyword1)
            return
        }
    })
    $('#secondaryTag2').click(function() {
        if ($('#primaryTag1').hasClass('on')) {
            searchKeyword2 = "%20crochet"
            console.log(searchKeyword2)
            return
        }
        if ($('#primaryTag2').hasClass('on')) {
            searchKeyword2 = "%20management"
            console.log(searchKeyword2)
            return
        }
        if ($('#primaryTag3').hasClass('on')) {
            searchKeyword2 = "%20studying"
            console.log(searchKeyword2)
            return
        }
    })
    $('#secondaryTag3').click(function() {
        if ($('#primaryTag1').hasClass('on')) {
            searchKeyword3 = "%20music"
            console.log(searchKeyword3)
            return
        }
        if ($('#primaryTag2').hasClass('on')) {
            searchKeyword3 = "%20customer service"
            console.log(searchKeyword3)
            return
        }
        if ($('#primaryTag3').hasClass('on')) {
            searchKeyword3 = "%20testing"
            console.log(searchKeyword3)
            return
        }
    })
    $('#secondaryTag4').click(function() {
        if ($('#primaryTag1').hasClass('on')) {
            searchKeyword4 = "%20creative%20writing"
            console.log(searchKeyword4)
            return
        }
        if ($('#primaryTag2').hasClass('on')) {
            searchKeyword4 = "%20time%20management"
            console.log(searchKeyword4)
            return
        }
        if ($('#primaryTag3').hasClass('on')) {
            searchKeyword4 = "%20time%20management"
            console.log(searchKeyword4)
            return
        }
    })
    $('#secondaryTag5').click(function() {
        if ($('#primaryTag1').hasClass('on')) {
            searchKeyword5 = "%20coding"
            console.log(searchKeyword5)
            return
        }
    })
    $('#secondaryTag6').click(function() {
        if ($('#primaryTag1').hasClass('on')) {
            searchKeyword6 = "%20digital art"
            console.log(searchKeyword6)
            return
        }
    })

    //settings for ajax request from API on button press
    $('#submitButton').click(function() {
        console.log('button pressed with keywords' + searchKeyword1 + searchKeyword2 + searchKeyword3 + searchKeyword4 + searchKeyword5 + searchKeyword6)
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://learning-objects-v2.p.rapidapi.com/search?keywords=" + searchKeyword1 + searchKeyword2 + searchKeyword3 + searchKeyword4 + searchKeyword5 + searchKeyword6 + "&lang=en&sort=popularity&model=strict&max=10&page=0",
            "method": "GET",
            //"dataType": "json",

            "headers": {
                "x-rapidapi-host": "learning-objects-v2.p.rapidapi.com",
                "x-rapidapi-key": "4b7db33ab6msh45b94f727f01691p1606f5jsn1f672badea4c"
            }
        }
        $.ajax(settings).done(function(response) {
            console.log(response)
            for (let i = 0; i < 9; i++) {

                console.log(response.response.content[i])

                cardDescription = response.response.content[i].description
                cardUrl = response.response.content[i].url
                cardTitle = response.response.content[i].title
                cardProvider = response.response.content[i].provider
                cardPicture = response.response.content[i].picture

                //Card Image div's made
                $cardImg = $("<img>").attr('src', cardPicture)
                $cardImgFig = $("<figure>").addClass("image is-4by3").append($cardImg)

                $cardImgDiv = $("<div>").addClass('card-image').append($cardImgFig)

                //Card Media Dive for Small Picture
                $cardMediaImg = $("<img>").attr('src', cardPicture)
                $cardMediaFig = $("<figure>").addClass("image is-16by9").append($cardMediaImg)
                $cardMediaSml = $("<div>").addClass("media-left").append($cardMediaFig)

                $cardMedia = $("<div>").addClass("media").append($cardMediaSml)

                //Card Media Div for Title and Provider
                $cardTitle = $("<p>").addClass("title is-4").text(cardTitle)
                $cardProvider = $("<p>").addClass("subtitle is-4").text(cardProvider)

                $cardTitleDiv = $("<div>").addClass("media-content").append($cardTitle, $cardProvider)

                //Card Description
                $cardDesc = $("<div>").addClass("content").text(cardDescription)

                $cardContent = $("<div>").addClass("card-content").append($cardMedia, $cardTitleDiv, $cardDesc)

                //creates the card div to hold Title, description, & image
                $cardDiv = $("<div>").addClass("box").append($cardImgDiv, $cardContent)

                $("#apiBlocks").append($cardDiv)


            }
        })

    })
})