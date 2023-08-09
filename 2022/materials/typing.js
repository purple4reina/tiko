/**
 * Created by rachel on 7/22/15.
 * Updated by rey on 2/3/22
 */

// Typey Typey is my Javascript-based version of the game Typespeed. Enjoy!


// List of words to be typed

var wordList = ['tikondane', 'maggots', 'worms', 'chicken', 'kalulu',
    'verandah', 'lodge', 'tiko', 'bicycle', 'katete', 'compost', 'pigs',
    'incubator', 'chicks', 'biosecurity', 'fodder', 'dorm', 'roundavel',
    'office', 'maintenance', 'soldier', 'reception', 'cow', 'rabbit', 'nshima',
    'veggie', 'potato', 'stones', 'sticks', 'manure', 'eggs', 'zambia',
    'agogo', 'maize', 'field', 'shit', 'computer', 'mbatatis', 'snake',
    'spiders', 'director', 'puppies', 'eastern', 'province', 'chipata',
    'goats', 'purple', 'larvae', 'larva', 'farming', 'community', 'village',
    'lusaka', 'soap', 'meeting', 'millionaire', 'uganda', 'nyau',
    'chinamwali', 'mvula', 'farming', 'grants'];

// Display words from list on screen (randomly selected)

function addWord() {
    var currentWordIndex = Math.floor((Math.random() * (wordList.length - 1)) + 1);
    var currentWord = wordList[currentWordIndex];

    // Creates a new div containing the randomly selected word

    var newDiv = document.createElement('div');
    newDiv.classList.add(currentWord);
    newDiv.classList.add('wordsToType');
    newDiv.innerHTML = currentWord;

    // Creates a randomized position for each new word within the wordsOnPage div

    var offsetTop = Math.floor((Math.random() * 500) + 1);
    var offsetLeft = Math.floor((Math.random() * 500) + 1);
    $(newDiv).css({position: 'absolute'});
    newDiv.style.top = offsetTop + 'px';
    newDiv.style.left = offsetLeft + 'px';

    // Assigns a color to the new word

    wordColor = chooseColor();
    $(newDiv).css({color: wordColor});

    $('#wordsonpage').append(newDiv);

    // Animates word going slowly to the right of the screen, then disappearing and being removed
    // from the array of words on the screen if it has not been typed by that point

    $(newDiv).animate({
        left: window.innerWidth
    }, 100000, 'linear', function() {
        $(newDiv).remove();
    });

}

// Method that randomly chooses a color for each new word.

function chooseColor() {

    // These values are based on Crayola colors, of course.
    // Taken from http://www.colourlovers.com/web/blog/2008/04/22/all-120-crayon-names-color-codes-and-fun-facts

    var colorValues = ['CD4A4A', 'CC6666', 'BC5D58', 'FF5349', 'FD5E53', 'FD7C6E', 'FDBCB4', 'FF6E4A', 'FFA089',
        'EA7E5D', 'B4674D', 'A5694F', 'FF7538', 'FF7F49', 'DD9475', 'FF8243', 'FFA474', '9F8170', 'CD9575',
        'EFCDB8', 'D68A59', 'DEAA88', 'FAA76C', 'FFCFAB', 'FFBD88', 'FDD9B5', 'FFA343', 'EFDBC5', 'FFB653',
        'E7C697', 'FAE7B5', 'FFCF48', 'FCD975', 'FDDB6D', 'FCE883', 'F0E891', 'ECEABE', 'BAB86C', 'FDFC74',
        'FFFF99', 'C5E384', 'B2EC5D', '87A96B', 'A8E4A0', '1DF914', '76FF7A', '71BC78', '6DAE81', '9FE2BF',
        '1CAC78', '30BA8F', '45CEA2', '3BB08F', '1CD3A2', '17806D', '158078', '1FCECB', '78DBE2', '77DDE7',
        '80DAEB', '99EBD', '1CA9C9', '1DACD6', '9ACEEB', '1A4876', '1974D2', '2B6CC4', '1F75FE', 'C5D0E6',
        'B0B7C6', '5D76CB', 'A2ADD0', '979AAA', 'ADADD6', '7366BD', '7442C8', '7851A9', '9D81BA', '926EAE',
        'CDA4DE', '8F509D',  'C364C5', 'FB7EFD', 'FC74FD', '8E4585', 'FF1DCE', 'FF1DCE', 'FF48D0', 'E6A8D7',
        'C0448F', '6E5160', 'DD4492', 'FF43A4', 'F664AF', 'FCB4D5', 'FFBCD9', 'F75394', 'FFAACC', 'E3256B',
        'FDD7E4', 'CA3767', 'DE5D83', 'FC89AC', 'F780A1', 'C8385A', 'EE204D', 'FF496C', 'EF98AA', 'FC6C85',
        'FC2847', 'FF9BAA', 'CB4154', 'DBD7D2', 'CDC5C2', '95918C'];
    var colorIndex = Math.floor((Math.random() * (colorValues.length - 1)) + 1);
    chosenColor = '#' + colorValues[colorIndex];
    return chosenColor;
}

// Adds new words to the page with a delay of eight seconds

var wordTiming = setInterval(addWord, 15000);


// Calls checkText function as user types

window.onkeyup = checkText;
var numberCorrect = 0;

// Compares user input with words currently on screen

function checkText(e) {
    // Clear typing box when Enter is pressed
    if (e.key === 'Enter') {
        $('#typing').val('');
        return;
    }
    // Finding all the words currently on the page
    var words = document.getElementsByClassName('wordsToType');
    var typedWord = $('#typing').val();
    for (var i = 0; i < words.length; i++) {
        // If a word is correct, it gets removed from the page
        if (words[i].innerHTML === typedWord) {
            var wordClass = '.' + typedWord;
            $(wordClass).remove();
            $('#typing').val('');
            // Augments the amount in the "words you got correct" textbox
            numberCorrect +=1;
            $('#correct').val(numberCorrect);
        }
    }
}

// Listening event for reset button

$('#reset').click(function() {
    location.reload();
});