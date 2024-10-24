import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++
        setTimeout(() => {

            if (i > 5) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf + ' ')
            }

        }, 500);

    }
}

fetch('http://localhost:3334', {
    method: 'POST',
    duplex: 'half',
    body: new OneToHundredStream()
}).then(res => {
    res.text().then(data => {
        console.log(data);
        
    })
})