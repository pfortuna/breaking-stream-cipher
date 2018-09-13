#!/bin/bash
FOLDER=./encrypted
ENCRYPTEDFILE=$FOLDER/output.txt
TARFILE=$FOLDER/src.tar
KEYFILE=key.txt

## dont edit past this line

if [ ! -f $KEYFILE ]; then
   echo "Oops! Looks like you haven't yet created a $KEYFILE with the GPG passphrase!"
   exit -1
fi

if [ -f $ENCRYPTEDFILE ]; then
   rm $ENCRYPTEDFILE
fi
if [ -f $TARFILE ]; then
   rm $TARFILE
fi

tar cvf $TARFILE ./src/* 
gpg2 --batch --yes --passphrase-file "$KEYFILE" --cipher-algo AES256 --armor --output "$ENCRYPTEDFILE" --symmetric "$TARFILE"

if [ -f $TARFILE ]; then
   rm $TARFILE
fi
