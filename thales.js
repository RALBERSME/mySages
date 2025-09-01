const circle = document.getElementById("circle");
const picker = document.getElementById("picker");

const pickerCircle = picker.firstElementChild;
const rect = circle.getBoundingClientRect();

const line = document.getElementById("line");
const line2 = document.getElementById("line2");
const pointB = document.querySelector(".B");
const center = {
  x: rect.left + rect.width / 2,
  y: rect.top + rect.height / 2,
};

class Thales {
  constructor() {
    pickerCircle.addEventListener("mousedown", this.mousedown.bind(this));
    this.mousemove = this.mousemove.bind(this);
    this.mouseup = this.mouseup.bind(this);
    this.calculateAnglesLengths(150, 0);
  }

  getAngle(x, y) {
    var deltaX = x - center.x,
      deltaY = y - center.y,
      angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
    return angle;
  }

  getLength(x, y) {
    let length1 = Math.sqrt(Math.pow(x - 0, 2) + Math.pow(y - 150, 2));
    let length2 = Math.sqrt(Math.pow(x - 300, 2) + Math.pow(y - 150, 2));
    return { length1, length2 };
  }

  calculateAnglesLengths(x, y) {
    document.getElementById("ab").textContent = this.getLength(
      x,
      y
    ).length1.toFixed(2);
    document.getElementById("cb").textContent = this.getLength(
      x,
      y
    ).length2.toFixed(2);
  }
  mousedown(event) {
    event.preventDefault();
    document.body.style.cursor = "move";
    this.mousemove(event);
    document.addEventListener("mousemove", this.mousemove);
    document.addEventListener("mouseup", this.mouseup);
  }
  mousemove(event) {
    picker.style.transform =
      "rotate(" + this.getAngle(event.pageX, event.pageY) + "deg)";
    pointB.style.transform =
      "rotate(" + -this.getAngle(event.pageX, event.pageY) + "deg)";
    let rect = pickerCircle.getBoundingClientRect();
    let pCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    let x2 = pCenter.x - circle.getBoundingClientRect().x;
    let y2 = pCenter.y - circle.getBoundingClientRect().y;
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line2.setAttribute("x2", x2);
    line2.setAttribute("y2", y2);
    this.calculateAnglesLengths(x2, y2);
  }
  mouseup() {
    document.body.style.cursor = null;
    document.removeEventListener("mouseup", this.mouseup);
    document.removeEventListener("mousemove", this.mousemove);
  }
}
new Thales();
