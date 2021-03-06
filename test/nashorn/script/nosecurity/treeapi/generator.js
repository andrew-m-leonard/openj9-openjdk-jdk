/*
 * Copyright (c) 2016, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
 * or visit www.oracle.com if you need additional information or have any
 * questions.
 */

/**
 * Tests to check representation of ES6 generators.
 *
 * @test
 * @option -scripting
 * @run
 */

load(__DIR__ + "utils.js")

var code = <<EOF

function* id(){
  var idx = 0;
  while(idx < 3)
    yield idx++;
}

var obj = {
    *q (x, y) {
       yield 1;
    }
};

var f = {
    [Symbol.iterator]: function*() {
        var cur = 1;
        for (;;) {
            yield cur;
        }
    }
};

EOF

parse("generator.js", code, "--language=es6", new (Java.extend(visitor_es6, {
    visitFunctionDeclaration : function (node, obj) {
        obj.push(convert(node))
    },
    visitVariable : function (node, obj) {
        obj.push(convert(node))
    }
})))

