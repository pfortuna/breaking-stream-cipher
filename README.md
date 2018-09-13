# Breaking a Stream Cipher that reused the key

This project was to developed to fulfill the 1st week assignment of Dan Boneh's [Cryptography I](https://www.coursera.org/learn/crypto/) coursera course.

It's goal is to find the stream cipher key using only a number of ciphertexts stored [here](data/ciphers.txt). It is assumed that all ciphertexts reused the same stream cipher key. The end goal is to decipher the message behind the last (11th) ciphertext in the file.

This project follows a method that tries to find the most probable key candidate for each character position (or column). For that it uses a pre-computed table generated with the help of [create-xor-table.js](create-xor-table.js). This method is not perfect and it actually gets two chars wrong, but that's more than enough to guess the correct message.

## Accessing the full souce code

As you may know, Coursera's Code of Honour doensn't allow students to share the solutions as plain text. For that reason the code was GPG encrypted and stored inside the `encrypted` folder.

You can have access to the source code if you know the solution of the assignment. In order to do that, create a `key.txt` file with the solution in the root of the cloned repo. Then call:

```
npm run decrypt
```

This will create the `src` folder.

### Dependencies
You must have `gpg2` and `tar` pre-installed in your computer.

## Running it

It's as easy as this:

```
npm start
```
