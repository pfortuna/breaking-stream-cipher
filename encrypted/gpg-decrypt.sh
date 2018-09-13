#!/bin/bash
FOLDER=./encrypted
ENCRYPTEDFILE=$FOLDER/output.txt
TARFILE=$FOLDER/src.tar
KEYFILE=key.txt
DECRYPTEDFOLDER="./src"

## dont edit past this line

if [ ! -f $KEYFILE ]; then
   echo "Oops! Looks like you haven't yet created a $KEYFILE with the GPG passphrase!"
   exit -1
fi

if [ -f $TARFILE ]; then
   echo "Error! Detected file $TARFILE. Shouldn't exist. Please verify and delete it."
   exit -1
fi

if [ -d "$DECRYPTEDFOLDER" ]; then
   echo "Error! Folder $DECRYPTEDFOLDER already exists. Aborting to avoid overwritting over existing code."
   exit -1
fi

gpg2 --batch --yes --passphrase-file "$KEYFILE" --output "$TARFILE" --decrypt "$ENCRYPTEDFILE"
tar xvf $TARFILE

if [ -f $TARFILE ]; then
   rm $TARFILE
fi
