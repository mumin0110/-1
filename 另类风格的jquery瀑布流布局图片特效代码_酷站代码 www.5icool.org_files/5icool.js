(function(a) {
    a.fn.waterfall = function(o, g, j) {
        var i = this;
        if (i.length <= 0) {
            return
        }
        if (typeof o !== "function") {
            j = g;
            g = o;
            o = a.noop
        }
        if (typeof g !== "string") {
            j = g;
            g = ""
        }
        var c = a.extend({},a.fn.waterfall.defaults, j);
        c.fn = o;
        var k,r = [];
        var q = !!g;
        var e = q ? a(g, i) : i , m = c.focus;
        if (q) {
            i.delegate(g, "mouseover mousemove", f);
            i.delegate(g, "mouseout", d)
        } else {
            i.bind("mouseover mousemove", f);
            i.bind("mouseleave", d)
        }
        n();
        function n() {
            for (var u = 0; u < e.length; u++) {
                var s = e.eq(u),
                v = s[0].scrollHeight,
                t = s.children().clone();
                s.append(t).data("cur", 0);
                if (c.async) {
                    p(u, u * c.gap + c.wait)
                }
            }
            h()
        }
        function h() {
            window.clearTimeout(k);
            k = window.setTimeout(function() {
                var s = e.index(e.filter("." + m));
                p((s + 1) % e.length);
                h()
            },
            c.autodelay)
        }
        function f() {
            a(this).attr("waiting", "1")
        }
        function d() {
            var t = a(this),
            s = e.index(t);
            a(this).removeAttr("waiting");
            if (c.mouseleavedo) {
                p(s)
            }
        }
        function l(s) {
            return
        }
        function b(v, y) {
            var v = v.not(":animated").not("[waiting],[sliding]");
            if (!v.length) {
                return
            }
            v.attr("sliding", "1");
            var x = v.children(),
            w = v.scrollTop(),
            u = v.data("cur"),
            s = x.length / 2;
            if (w < 10) {
                u = s - 1;
                w = x.eq(s).position().top;
                v.scrollTop(w)
            }
            var t = x.eq(u).position().top;
            v.animate({
                scrollTop: "+=" + t
            },
            c.anitime, 
            function() {
                a(this).data("cur", (s + (--u)) % s).removeAttr("sliding").removeAttr("waiting")
            });
            if (c.async) {
                v.delay(c.anidelay).queue(function() {
                    b(v);
                    a(this).dequeue()
                })
            }
        }
        function p(t, u) {
            var s = e.eq(t),
            u = u || 0;
            e.removeClass(m).eq(t).addClass(m);
            a({}).delay(u).queue(function() {
                if (s.children().length) {
                    if (c.down) {
                        b(s, true)
                    } else {
                        l(s, true)
                    }
                }
                a(this).dequeue()
            })
        }
        return i
    };
    a.fn.waterfall.defaults = {
        down: true,
        focus: "cur",
        index: 0,
        event: "click",
        mouseleavedo: false,
        async: false,
        wait: 4000,
        gap: 4000,
        anidelay: 14000,
        anitime: 1800,
        autodelay: 3000
    }
})(jQuery);

$(function() {
    $("#waterfall").waterfall("div.dym-dl", {index: 3})
});/* 酷站代码整理 http://www.5icool.org */