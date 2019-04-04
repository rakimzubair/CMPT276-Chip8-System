
// Object to manage input states
// notes:
// * Constructor accepts name of a keymapping, defaults to "default"
// * Constructor adds event listeners to the document, and adds a reference to itself
//   in the document so that the listeners can alter its state.

class keyInput {
    constructor(mapname = "default") {
        //is any key pressed
        this.keyspressed = 0;
        this.lastKey
        //Storage space for different keymappings
        this.savedmaps = {
            default: new Map([['x',0],['1', 1], ['2', 2], ['3', 3], ['q', 4], ['w', 5], ['e', 6], ['a', 7], ['s', 8], ['d', 9],
            ['z', 10], ['c', 11], ['4', 12], ['r', 13], ['f', 14], ['v', 15]])
        };

        this.keymap = this.savedmaps[mapname];

        this.keystate = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,];

        document.keyref = this;
        document.addEventListener('keydown', function (event) {
            var key = this.keyref.keymap.get(event.key)
            if (this.keyref.keystate[key] == false) {
                this.keyref.keystate[key] = true;
                this.keyref.lastKey = event.key
                this.keyref.keyspressed++
            }
        });
        document.addEventListener('keyup', function (event) {
            var key = this.keyref.keymap.get(event.key)
            if (this.keyref.keystate[key] == true) {
                this.keyref.keystate[key] = false;
                this.keyref.keyspressed--
            }
        })

    }

    //check state value
    check(keynum) {
        return this.keystate[keynum];
    };

}

//*******************
// WORK IN PROGRESS
//*******************

//Acts as reference for opcode functions
class OpcodeManager {

    constructor() {

    }

    getExecution(opcode) {
        return new Execution(opcode);
    }

    getInstruction(opcode) {
        switch (opcode & 0xF000) { // Get the first digit of the opcode
            case 0x0000:
                switch (opcode) {
                    // 0nnn - SYS addr - THIS COMMAND IS NOT NECESSARY
                    case 0x00E0: return new CLS(opcode);
                    case 0x00EE: return new RET(opcode);
                }
                break;
            case 0x1000: return new JP(opcode);
            case 0x2000: return new CALL(opcode);
            case 0x3000: return new SE_byte(opcode);
            case 0x4000: return new SNE_kk(opcode);
            case 0x5000: return new SE_y(opcode);
            case 0x6000: return new LD_byte(opcode);
            case 0x7000: return new ADD(opcode);
            case 0x8000:
                switch (opcode & 0x000F) { // Get the last digit of the opcode, the second and third digits are variable
                    case 0x0000: return new LD_y(opcode);
                    case 0x0001: return new OR(opcode);
                    case 0x0002: return new AND_byte(opcode);
                    case 0x0003: return new XOR(opcode);
                    case 0x0004: return new AND_y(opcode);
                    case 0x0005: return new SUB(opcode);
                    case 0x0006: return new SHR(opcode);
                    case 0x0007: return new SUB_N(opcode);
                    case 0x000E: return new SHL(opcode);
                }
                break;
            case 0x9000: return new SNE_Vy(opcode);
            case 0xA000: return new LD(opcode);
            case 0xB000: return new JP_V0(opcode);
            case 0xC000: return new RND(opcode);
            case 0xD000: return new DRW(opcode);
            case 0xE000:
                switch (opcode & 0x00FF) {
                    case 0x009E: return new SKP(opcode);
                    case 0x00A1: return new SKNP(opcode);
                }
                break;
            case 0xF000:
                switch (opcode & 0x00FF) {
                    case 0x0007: return new LD_Vx_DT(opcode);
                    case 0x000A: return new LD_K(opcode);
                    case 0x0015: return new LD_DT_Vx(opcode);
                    case 0x0018: return new LD_ST(opcode);
                    case 0x001E: return new ADD_I(opcode);
                    case 0x0029: return new LD_F(opcode);
                    case 0x0033: return new LD_B(opcode);
                    case 0x0055: return new LD_I_Vx(opcode);
                    case 0x0065: return new LD_Vx_I(opcode);
                }
                break;
            default:
                throw new Error("Invalid opcode: " + opcode.toString(16));
        }
    }

}

// wraps code representing the execution of a specified opcode
// * execute the instruction
// * saves StateChange record
class Execution {
    constructor(opcode) {
        this.opcode = opcode;
        this.instruction = OpcodeManager.getInstruction(opcode);
    }

    execute(chip8) {

    }
}



var VarEnum = {
    PC: 1,
    SP: 2,
    DELAYTIMER: 3,
    SOUNDTIMER: 4,
    IREGISTER: 5,
    VREGISTER: 6,
    MEMORY: 7,
    STACK: 8,
    DISPLAY: 9
}

//extract a specified digit from
extractDigit = function(opcode, digit){
    if(digit >=4 || digit < 0){
        throw new Error("Invalid argument: " + digit + "is not number 0 < n < 4.")
    }
    return opcode >> (12 - 4 * digit) & 0x000F
}

//represents a single value of some state variable
// varID is the number assigned to the state variable by VarEnum
// ex. PC = 7
// ex. STACK[3] = 256
class SingleStateValue {
    constructor(varID, value, position = 0){
        this.varID = container
        this.position = position
        this.value = value
    }
}

//represents a range of values within a array-type state variable, all assigned the same value
class RangeStateValue {

}

//represents specifically chosen state values
class CondensedState {
    constructor(values) {
        this.values = values
    }
}


//********************************
//Opcode functions
//********************************

// base class for an instruction
class Instruction {
    constructor(opcode) {
        this.preState = []
        this.opcode = opcode
    }

    execute(chip8) {
    }

    getName() {
        return this.name
    }

}

// clear the display
//00E0
class CLS extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'CLS'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }

    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "CLS";
        chip8.INSTRUCTINFO[2] = "Clear the display.";
        chip8.clearDisplay();
    }

    saveState(chip8) {
        for (var i = 0; i < chip8.DISPLAY.length; i++){
            this.stateRecord.push(new SingleStateValue(VarEnum.DISPLAY, chip8.DISPLAY[i], i))
        }
    }
}

// return from a subroutine
//00EE
class RET extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'RET'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }

    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "RET";
        chip8.INSTRUCTINFO[2] = "Return from a subroutine.";
        chip8.SP--;
        chip8.PC = chip8.STACK[chip8.SP];
        
    }

    saveState(chip8, state) {
        this.stateRecord.push(new SingleStateValue(VarEnum.PC, chip8.PC))
        this.stateRecord.push(new SingleStateValue(VarEnum.SP, chip8.SP))
    }
}

//Jump to location nnn
//1nnn
class JP extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'JP'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }

    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "JP";
        chip8.INSTRUCTINFO[2] = "Jump to location.";
        chip8.PC = this.opcode & 0x0FFF;
    }

    saveState(chip8, state) {
        this.sateRecord.push(new SingleStateValue(VarEnum.PC, chip8.PC))
    }
}

//Call subroutine
//2nnn
class CALL extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'CALL'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }

    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "CALL";
        chip8.INSTRUCTINFO[2] = "Call subroutine.";
        chip8.STACK[chip8.SP] = chip8.PC;
        chip8.SP++;
        chip8.PC = this.opcode & 0x0FFF;
    }

    saveState(chip8, state) {

    }
}

//Skip next instruction if Vx = kk
//3xkk
class SE_byte extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'SE_byte'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }

    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "SE";
        chip8.INSTRUCTINFO[2] = "Skip next instruction if Vx = kk.";
        if (chip8.VREGISTER[extractDigit(this.opcode,1)] == (this.opcode & 0x00FF)) {
            chip8.PC += 2;
        }
    }

    saveState(chip8, state) {

    }
}

//Skip next instruction if Vx != kk
//4xkk
class SNE_kk extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'SNE_kk'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }

    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "SNE";
        chip8.INSTRUCTINFO[2] = "Skip next instruction if Vx != kk.";
        if (chip8.VREGISTER[extractDigit(this.opcode,1)] != (this.opcode & 0x00FF)) {
            chip8.PC += 2;
        }
    }

    saveState(chip8, state) {

    }
}

//Skip next instruction if Vx = Vy
//5xy0
class SE_y extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'SE_y'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }

    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "SE";
        chip8.INSTRUCTINFO[2] = "Skip next instruction if Vx = Vy.";
        if (chip8.VREGISTER[extractDigit(this.opcode,1)] == chip8.VREGISTER[extractDigit(this.opcode,2)]) {
            chip8.PC += 2;
        }
    }

    saveState(chip8, state) {

    }
}

//Set Vx = kk
//6xkk
class LD_byte extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'LD_byte'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }

    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "LD";
        chip8.INSTRUCTINFO[2] = "Set Vx = kk.";
        chip8.VREGISTER[extractDigit(this.opcode,1)] = (this.opcode & 0x00FF);
    }

    saveState(chip8, state) {

    }
}

//Set Vx = Vx + kk
//7xkk
class ADD extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'ADD'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }

    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "ADD";
        chip8.INSTRUCTINFO[2] = "Set Vx = Vx + kk.";
        var sum = chip8.VREGISTER[extractDigit(this.opcode,1)] + (this.opcode & 0x00FF);

        if (sum > 255) {
            sum -= 256;
        }

        chip8.VREGISTER[extractDigit(this.opcode,1)] = sum;
    }

    saveState(chip8, state) {

    }
}

//Set Vx = Vy
//8xy0
class LD_y extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'LD_y'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "LD";
        chip8.INSTRUCTINFO[2] = "Set Vx = Vy.";
        chip8.VREGISTER[extractDigit(this.opcode,1)] = chip8.VREGISTER[extractDigit(this.opcode,2)];
    }

    saveState(chip8, state) {

    }
}

//Set Vx = Vx OR Vy
//8xy1
class OR extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'OR'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "OR";
        chip8.INSTRUCTINFO[2] = "Set Vx = Vx OR Vy.";
        let x = extractDigit(this.opcode,1)
        let y = extractDigit(this.opcode,2)
        chip8.VREGISTER[x] = chip8.VREGISTER[x] | chip8.VREGISTER[y];
    }

    saveState(chip8, state) {

    }
}

//Set Vx = Vx AND Vy
//8xy2
class AND_byte extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'AND_byte'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "AND";
        chip8.INSTRUCTINFO[2] = "Set Vx = Vx AND Vy.";
        let x = extractDigit(this.opcode,1)
        let y = extractDigit(this.opcode,2)
        chip8.VREGISTER[x] = chip8.VREGISTER[x] & chip8.VREGISTER[y];
    }

    saveState(chip8, state) {

    }
}

//Set Vx = Vx XOR Vy
//8xy3
class XOR extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'XOR'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "XOR";
        chip8.INSTRUCTINFO[2] = "Set Vx = Vx XOR Vy.";
        let x = extractDigit(this.opcode,1)
        let y = extractDigit(this.opcode,2)
        chip8.VREGISTER[x] = chip8.VREGISTER[x] ^ chip8.VREGISTER[y];
    }

    saveState(chip8, state) {

    }
}

//Set Vx = Vx + Vy, set VF = carry
//8xy4
class AND_y extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'AND_y'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "ADD";
        chip8.INSTRUCTINFO[2] = "Set Vx = Vx + Vy, set VF = carry.";
        let x = extractDigit(this.opcode,1)
        let y = extractDigit(this.opcode,2)
        if ((chip8.VREGISTER[x] + chip8.VREGISTER[y]) > 255) {
            chip8.VREGISTER[15] = 1;
        }
        else {
            chip8.VREGISTER[15] = 0;
        }
        chip8.VREGISTER[x] = (chip8.VREGISTER[x] + chip8.VREGISTER[y]) & 0x00FF;

    }

    saveState(chip8, state) {

    }
}

//Set Vx = Vx - Vy, set VF = NOT borrow
//8xy5
class SUB extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'SUB'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "SUB";
        chip8.INSTRUCTINFO[2] = "Set Vx = Vx - Vy, set VF = NOT borrow.";
        let x = extractDigit(this.opcode,1)
        let y = extractDigit(this.opcode,2)
        if (chip8.VREGISTER[x] > chip8.VREGISTER[y]) {
            chip8.VREGISTER[15] = 1;
        }
        else {
            chip8.VREGISTER[15] = 0;
        }
        chip8.VREGISTER[x] = chip8.VREGISTER[x] - chip8.VREGISTER[y];
    }

    saveState(chip8, state) {

    }
}

//Set Vx = Vx SHR Vy
//8xy6
class SHR extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'SHR'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "SHR";
        chip8.INSTRUCTINFO[2] = "Set Vx = Vx SHR Vy.";
        let x = extractDigit(this.opcode,1)
        let y = extractDigit(this.opcode,2)
        chip8.VREGISTER[15] = (chip8.VREGISTER[x] & 0x0001);
        chip8.VREGISTER[x] = chip8.VREGISTER[x] >> 1;

    }

    saveState(chip8, state) {

    }
}

//Set Vx = Vx - Vy, set VF = NOT borrow
//8xy7
class SUB_N extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'SUB_N'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "SUBN";
        chip8.INSTRUCTINFO[2] = "Set Vx = Vx - Vy, set VF = NOT borrow.";
        let x = extractDigit(this.opcode,1)
        let y = extractDigit(this.opcode,2)
        if (chip8.VREGISTER[x] < chip8.VREGISTER[y]) {
            chip8.VREGISTER[15] = 1;
        }
        else {
            chip8.VREGISTER[15] = 0;
        }
        chip8.VREGISTER[x] = chip8.VREGISTER[y] - chip8.VREGISTER[x];

    }

    saveState(chip8, state) {

    }
}

//Set Vx = Vx SHL 1
//8xyE
class SHL extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'SHL'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "SHL";
        chip8.INSTRUCTINFO[2] = "Set Vx = Vx SHL 1.";
        let x = extractDigit(this.opcode,1)
        chip8.VREGISTER[15] = chip8.VREGISTER[x] >> 7;
        chip8.VREGISTER[x] = chip8.VREGISTER[x] << 1;

    }

    saveState(chip8, state) {

    }
}

//Skip next instruction if Vx != Vy
//9xy0
class SNE_Vy extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'SNE_Vy'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "SNE";
        chip8.INSTRUCTINFO[2] = "Skip next instruction if Vx != Vy.";
        let x = extractDigit(this.opcode,1)
        let y = extractDigit(this.opcode,2)
        if (chip8.VREGISTER[x] != chip8.VREGISTER[y]) {
            chip8.PC += 2;
        }
    }

    saveState(chip8, state) {

    }
}

//Set I = nnn
//Annn
class LD extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'LD'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "LD";
        chip8.INSTRUCTINFO[2] = "Set I = nnn.";
        chip8.IREGISTER = (this.opcode & 0x0FFF);
    }

    saveState(chip8, state) {

    }
}

//Jump to location nnn + V0
//Bnnn
class JP_V0 extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'JP_V0'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
       chip8.INSTRUCTINFO[1] = "JP";
       chip8.INSTRUCTINFO[2] = "Jump to location nnn + V0.";
       chip8.PC = (this.opcode & 0x0FFF) + chip8.VREGISTER[0];
    }

    saveState(chip8, state) {

    }
}


//Set Vx = random byte AND kk
//Cxkk
class RND extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'RND'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "RND";
        chip8.INSTRUCTINFO[2] = "Set Vx = random byte AND kk";
        chip8.VREGISTER[extractDigit(this.opcode,1)] = ((Math.floor((Math.random() * 255))) & (this.opcode & 0x00FF));

    }

    saveState(chip8, state) {

    }
}

//Display n-byte sprite starting at memory location I at (Vx, Vy), set VF = collision
//Dxyn
class DRW extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'DRW'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "DRW";
        chip8.INSTRUCTINFO[2] = "Display n-byte sprite starting at memory location I at (Vx, Vy), set VF = collision.";
        var N = (this.opcode & 0x000F); // The height of the sprite
        var startX = chip8.VREGISTER[extractDigit(this.opcode,1)]; // The x coordinate of the sprite
        var startY = chip8.VREGISTER[extractDigit(this.opcode,2)]; // The y coordinate of the sprite
        chip8.VREGISTER[0xF] = 0; // The VF register will act as a flag for if a pixel on the display is unset
        var pixel; // The value of a pixel, taken from memory

        for (var yCoord = 0; yCoord < N; yCoord++) { // There are N rows of length 8 pixels
            pixel = chip8.MEMORY[chip8.IREGISTER + yCoord]; // The value of the current pixel is taken from memory
            for (var xCoord = 0; xCoord < 8; xCoord++) {
                if ((pixel & (0x80 >> xCoord)) != 0) { // If the current pixel is not empty
                    if (chip8.DISPLAY[(startX + xCoord) + ((startY + yCoord) * 64)] == 1) { // Check if the current pixel is already set or not
                        chip8.VREGISTER[0xF] = 1; // Unsetting a pixel will set the VF register
                    }
                    chip8.setPixel(startX + xCoord, startY + yCoord);
                }
            }
        }
    }

    saveState(chip8, state) {

    }
}

//Skip the next instruction if key with value of Vx is pressed
//Ex9E
class SKP extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'SKP'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "SKP";
        chip8.INSTRUCTINFO[2] = "Skip the next instruction if key with value of Vx is pressed.";
        if (chip8.KEYS.keystate[chip8.VREGISTER[extractDigit(this.opcode,1)]]) {
            chip8.PC += 2;
        }
    }

    saveState(chip8, state) {

    }
}

//Skip the next instruction if key with value of Vx is not pressed
//ExA1
class SKNP extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'SKNP'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "SKNP";
        chip8.INSTRUCTINFO[2] = "Skip the next instruction if key with value of Vx is not pressed.";
        if (!chip8.KEYS.keystate[chip8.VREGISTER[extractDigit(this.opcode,1)]]) {
            chip8.PC += 2;
        }
    }

    saveState(chip8, state) {

    }
}

//Set Vx = delay timer value
//Fx07
class LD_Vx_DT extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'LD_Vx_DT'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "LD";
        chip8.INSTRUCTINFO[2] = "Set Vx = delay timer value.";
        chip8.VREGISTER[extractDigit(this.opcode,1)] = chip8.DELAYTIMER;
    }

    saveState(chip8, state) {

    }
}

//Wait for a key press, store the value of the key in Vx
//Fx0A
//uses LD_K_Endhalt below
class LD_K extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'LD_K'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {

        chip8.HALT = true
        var endhalt = LD_K_Endhalt

        //tell the listener which register to deposit key value into
        endhalt.register = extractDigit(this.opcode,1)
        document.addEventListener('keydown',LD_K_Endhalt)
        chip8.INSTRUCTINFO[1] = "LD";
        chip8.INSTRUCTINFO[2] = "Wait for a key press, store the value of the key in Vx.";
    }

    saveState(chip8, state) {

    }
}

//function used by LD_K to process key events
function LD_K_Endhalt(e){
    if(!chip8.PAUSE){
        chip8.HALT = false
        chip8.VREGISTER[this.register] = e.key
        chip8.startExecution()
        document.removeEventListener('keydown',LD_K_Endhalt)
    }
}

//Set delay timer = Vx
//Fx15
class LD_DT_Vx extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'LD_DT_Vx'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "LD";
        chip8.INSTRUCTINFO[2] = "Set delay timer = Vx.";
        chip8.DELAYTIMER = chip8.VREGISTER[extractDigit(this.opcode,1)];
    }

    saveState(chip8, state) {

    }
}

//Set sound timer = Vx
//Fx18
class LD_ST extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'LD_ST'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "LD";
        chip8.INSTRUCTINFO[2] = "Set sound timer = Vx.";
        chip8.SOUNDTIMER = chip8.VREGISTER[extractDigit(this.opcode,1)];
    }

    saveState(chip8, state) {

    }
}

//Set I = I + Vx
//Fx1E
class ADD_I extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'ADD_I'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "ADD";
        chip8.INSTRUCTINFO[2] = "Set I = I + Vx.";
        chip8.IREGISTER += chip8.VREGISTER[extractDigit(this.opcode,1)];
    }

    saveState(chip8, state) {

    }
}

//Set I = location of sprite for digit Vx
//Fx29
class LD_F extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'LD_F'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "LD";
        chip8.INSTRUCTINFO[2] = "Set I = location of sprite for digit Vx.";
        chip8.IREGISTER = chip8.VREGISTER[extractDigit(this.opcode,1)] * 5; // Character sprites have a width of 5

    }

    saveState(chip8, state) {

    }
}

//Store BCD representation of Vx in memory locations I, I+1, and I+2
//Fx33
class LD_B extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'LD_B'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "LD";
        chip8.INSTRUCTINFO[2] = "Store BCD representation of Vx in memory locations I, I+1, and I+2.";
        var number = chip8.VREGISTER[extractDigit(this.opcode,1)];
        chip8.MEMORY[chip8.IREGISTER + 2] = parseInt(number % 10);
        chip8.MEMORY[chip8.IREGISTER + 1] = parseInt((number / 10) % 10);
        chip8.MEMORY[chip8.IREGISTER] = parseInt((number / 100) % 10);

    }

    saveState(chip8, state) {

    }
}

//Store registers V0 through Vx in memory starting at location I
//Fx55
class LD_I_Vx extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'LD_I_Vx'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "LD";
        chip8.INSTRUCTINFO[2] = "Store registers V0 through Vx in memory starting at location I.";
        let x = extractDigit(this.opcode,1)
        for (var i = 0; i <= x; i++) {
            chip8.MEMORY[chip8.IREGISTER + i] = chip8.VREGISTER[i];
        }
    }

    saveState(chip8, state) {

    }
}

//Read registers V0 through Vx from memory starting at location I
//Fx65
class LD_Vx_I extends Instruction{
    constructor(opcode) {
        super(opcode)
        this.name = 'LD_Vx_I'
        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);
    }
    execute(chip8) {
        chip8.INSTRUCTINFO[1] = "LD";
        chip8.INSTRUCTINFO[2] = "Read registers V0 through Vx from memory starting at location I.";
        let x = extractDigit(this.opcode,1)
        for (var i = 0; i <= x; i++) {
            chip8.VREGISTER[i] = chip8.MEMORY[chip8.IREGISTER + i];
        }
    }

    saveState(chip8, state) {

    }
}
