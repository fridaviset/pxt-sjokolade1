namespace Bilres1_1 {
    /**
     * This function should detect the formation of cars on a given line and convert it to a number
     */
    //%block
    export function code_line(line_number: number) {
        let multiplikator: number = 1
        let coded_line: number = 0
        let x: number = 0
        while (x < 5) {
            if (led.point(x, line_number)) {
                coded_line=coded_line+multiplikator
            }
            multiplikator = multiplikator * 2
            x++
        }
        return coded_line
    }
    



    /**
     * This function should convert a number to a formation of cars on a horizontal line
     */
    //%block
    export function decode_line(line_number: number, coded_line: number) {
        let x: number = 0
        let multiplikator: number = 1
        while (x < 5) {
            multiplikator = multiplikator * 2
            if (coded_line % multiplikator == 0) {
                led.unplot(x, line_number)
            }
            else {
                led.plot(x,line_number)
            }
            coded_line=coded_line-(coded_line%multiplikator)
            x++
        }
    }

    /**
     * This function moves all traffic one step down
     */
    //%block
    export function moveTraffic() {
        Bilres1_1.decode_line(4, Bilres1_1.code_line(3))
        Bilres1_1.decode_line(3, Bilres1_1.code_line(2))
        Bilres1_1.decode_line(2, Bilres1_1.code_line(1))
        Bilres1_1.decode_line(1, Bilres1_1.code_line(0))
        Bilres1_1.decode_line(0, Bilres1_1.random_traffic())
    }

    /**
     * This function will clear the bottom line
     */
    //%block
    export function clearBottomLine() {
        for (let x = 0; x < 5; x++){
            led.unplot(x,4)
        }
    }

    /**
     * This funciton returns true if the car has crashed into oncoming traffic
     */
    //%block
    export function carHasCrashed(car_x: number) {
        return led.point(car_x,4)
    }

    /**
     * This function is here to generate random traffic
     */
    //%block
    export function random_traffic() {
        let all_possible_lines = [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 16, 17, 18, 20, 24]
        let random_pick=Math.random(16)
        return all_possible_lines[random_pick]
    }
    /**
     * This function is here to save new highscores
     */
    //%block
    export function saveScore(score: number) {
        let scoreString: string=score.toString()
        basic.showString("SCORE: ")
        basic.showString(scoreString)
        let highscore: number=files.settingsReadNumber("Highscore")
        if (highscore == -1) {
            files.settingsSaveNumber("Highscore", score)
        }
        else if (highscore < score) {
            files.settingsSaveNumber("Highscore", score)
            basic.showString("NEW HIGHSCORE!")
        }
        else {
            basic.showString("HIGHSCORE: ")
            let highScoreString: string = highscore.toString()
            basic.showString(highScoreString)
        }
        serial.writeNumber(files.settingsReadNumber("Highscore"))

        

        
    }

    /**
     * This function quickly draws a ghost
     */
    //%block
    export function drawGhost() {
        for (let x= 0; x < 5; x++){
            for (let y= 0; y < 5; y++){
                led.plot(x,y)
            }
        }
        led.unplot(0, 0)
        led.unplot(4, 0)
        led.unplot(1, 1)
        led.unplot(3, 1)
        led.unplot(1, 4)
        led.unplot(3,4)
    }
    /**
     * This function shows an animation when game is over
     */
    //%block
    export function gameOverAnimation() {
        Bilres1_1.drawGhost()
        basic.pause(500)
        basic.clearScreen()
        basic.pause(500)
        Bilres1_1.drawGhost()
        basic.pause(500)
        basic.clearScreen()
        basic.pause(500)
        Bilres1_1.drawGhost()
        basic.pause(500)
        basic.clearScreen()
    }
    
    /**
     *This function lets you move the car one place to the left
    */
    //%block
    export function moveLeft(car_x: number) {
        led.toggle(car_x, 4)
        car_x -= 1
        led.toggle(car_x, 4)
        return car_x
    }

    /**
     *This function lets you move the car one place to the right
    */
    //%block
    export function moveRight(car_x: number) {
        led.toggle(car_x, 4)
        car_x += 1
        led.toggle(car_x, 4)
        return car_x
    }

}

