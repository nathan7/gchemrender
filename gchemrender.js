'use strict';
var textsize = 20
  , font = 'Arial Bold'
  , fontdef = textsize + 'pt ' + font
  , letterfudge = 1.5
  , lineWidth = 3

function renderFile(doc, canvas_) {
  var maxx = 0
    , maxy = 0
  $('atom', doc).each(function() {
    var atom = parseAtom(this)
    maxx = Math.max(atom.x, maxx)
    maxy = Math.max(atom.y, maxy)
  })
  var canvas = canto(canvas_)
  canvas.reset()
  canvas.width = maxx + 50
  canvas.height = maxy + 50
  canvas.font = fontdef
  renderDoc(doc, canvas)
}

function parseAtom(atom) {
  return (
    { x: parseFloat($('position', atom).attr('x'))
    , y: parseFloat($('position', atom).attr('y'))
    , e: $(atom).attr('element')
    })
}

function renderDoc(doc, canvas) {
  $('bond', doc).each(function() {
    var begin = parseAtom($("#" + $(this).attr('begin'), doc))
      , end = parseAtom($("#" + $(this).attr('end'), doc))
      , order = +$(this).attr('order')
      , dir = Math.atan2(end.y - begin.y, end.x - begin.x)
      , diffx = Math.cos(dir) * 10
      , diffy = Math.sin(dir) * 10
    if (begin.e != 'C') {
      begin.x += diffx * letterfudge
      begin.y += diffy * letterfudge
    }
    if (end.e != 'C') {
      end.x -= diffx * letterfudge
      end.y -= diffy * letterfudge
    }
    if (order > 1) {
      diffx /= 3
      diffy /= 3
      canvas.moveTo(begin.x - diffy, begin.y + diffx).lineTo(end.x - diffy, end.y + diffx)
      canvas.moveTo(begin.x + diffy, begin.y - diffx).lineTo(end.x + diffy, end.y - diffx)
      if (order == 3) canvas.moveTo(begin.x, begin.y).lineTo(end.x, end.y)
    }
    else
      canvas.moveTo(begin.x, begin.y).lineTo(end.x, end.y)
  })
  canvas.stroke({ lineWidth: lineWidth })
  $('atom', doc).each(function() {
    var atom = parseAtom(this)
    if (atom.e != 'C')
        canvas.fillText(atom.e, atom.x - (canvas.textWidth(atom.e) / 2), atom.y + (textsize * 0.375))
  })
}
