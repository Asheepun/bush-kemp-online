const v = (X, Y) => {
    let x = X, y = Y;
    let mag = Math.sqrt(x*x + y*y);
    return {
        x,
        y,
        mag,
    }
}

const add = (vec1, vec2) => {
    return v(vec1.x + vec2.x,
                  vec1.y + vec2.y);
}

const sub = (vec1, vec2) => {
    return v(vec1.x - vec2.x,
                  vec1.y - vec2.y);
}

const mult = (vec, mult) => {
    return v(vec.x * mult, vec.y * mult);
}

const div = (vec, div) => {
    return v(vec.x / div, vec.y / div);
}

const normalize = (vec) => {
    return v(vec.x / vec.mag, vec.y / vec.mag);
}

const reverse = (vec) => {
    return v(-vec.x, -vec.y);
}

const angle = (v1, v2) => {
    return Math.atan2(
        v2.y - v1.y,
        v2.x - v1.x
    );
}

const getV = (v1, v2) => {
    let dif = sub(v1, v2);
    dif = normalize(dif);
    dif = reverse(dif);
    return dif;

}