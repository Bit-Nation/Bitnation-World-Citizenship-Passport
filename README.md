# Prototype Identity System for Bitnation

Use Case

User Case Scenario: Muhammed who lives in Kabul is using the services of Bitnation because of the poor governance services his local government is offering. In Afghanistan, government issued IDs are not trustable, because the process of issuing them is plagued by heavy corruption. Rather, people tend to ask for a corporate ID for various verification purposes. Hence, Muhammed registers a Bitnation ID to increase his ability to interact with other parties on the Bitnation platform in Afghanistan - to sign contracts, register land, incorporate companies, get married, etc -- all which the use of a secure, verified ID enhances.

As Muhammed performs transactions using his BitPassport as a form of ID, his identity’s reputation with the system increases. Furthermore, Muhammed can call on his friends, business associates, and anyone else with whom he transacts, to sign his BitPassport as a means to further improve the quality  and trust in his online identity.

PGP as the building block.

Before choosing a technology and depoloying it, some basic understanding of the dynamics of identity management is required.  PGP looks like the best foundation for an identity system.  Each individual has a pair of keys.  One is public and one is private.  The public key can be widely distributed and even advertised on the web/email/business-card. Messages encrypted with a private key can be decrypted with the public key and vice versa.  

This allows the individual to assert something and sign (ie encrypt a copy or a hash of the thing being asserted) that assertion.  In essence, it allows the holder of the private key to specifically and securely to ‘say’ something and for it to be hard for that person to be impersonated.   This is a vital part of a person having an ‘identity’.

The second feature of PGP is that messages encrypted with the public key can only be decrypted with the private key.  This allows anyone who has the public key (ie the general public) to construct messages that only the holder of the private key can read.  This provides for a private means of communication to between individuals - where each encrypts their messages using the other’s public key and signs the message with their own private key.

This method of signing and encrypting allows for assured conversations to take place between individuals.  This is building block of any identity system.

Significant difficulty arises, however, when you try to scale the system as you need a reliable way to pass your public key to someone and for them to be able to identify you from your public key.  This has traditionally been solved by have a Certificate Authority.  A CA is an entity that checks your identity and then encrypts your public key with their own private key.  You can then send or publish this encrypted version of your public key to anyone.  As the CA’s public key is well known and advertised, your public key can be gained by decrypting this version with the CA’s public key.  If it properly decrypts then the user knows that you have been checked by the CA (a trusted body).

Of course, you can have your key signed by anyone.  The degree to which it is useful depends upon how well that person is known and trusted.  The model where you have your friends sign your key is commonly called the ‘web of trust’ model.

Research

PKI and why it is difficult

Excellent and indepth.  This looks at the history of attempts to manage large numbers of public/private key pairs.  Looks at Certificate Authorities and the history of signing keys.  

https://www.youtube.com/watch?v=GQVSpHDfW4s

Reputation Systems

Looks at the dynamics of online reputation systems.  Having the wrong sort of peer to peer reputation metrics can destroy a business - for example, a competitive points system on a co-operative site just does not work.  Also concludes that ‘star’ systems are very poor.

https://www.youtube.com/watch?v=Yn7e0J9m6rE

Web of Trust and Signing other’s Keys

Considers what it means to sign other people’s keys.  Is it necessary to use your real name?  What does it mean to have an identity.

https://www.youtube.com/watch?v=Gjk2lg2o7mE

Basic Design


Will start with keybase.io as the infrastructure.   Basic features of keybase.io that are useful to us include;

a)    Set up a new user (albeit it requires an invitation)

b)    Generate a public/private key pair

c)    Store the private key for the user

d)    Encrypt and sign messages

e)    Decrypt messages and check signatures

f)    Search for and retrieve the public details of other users

g)    link their public/private key pair to various social accounts

h)    ‘Track’ someone - ie sign a copy of their identity details so that 



Proof of concept tests

1.    Construct a mini site that can retrieve and display the id of someone on keybase

2.    Allow login to a keybase ID

3.    Encrypt and sign a message

4.    Decrypt a message and verify a signature
