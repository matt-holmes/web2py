# -*- coding: utf-8 -*-
db.define_table('accounts',
 Field('id',requires=IS_NOT_EMPTY()),
 Field('name',requires=IS_NOT_EMPTY()),
 Field('time_stamp','datetime'))

db.define_table('invitees',
 Field('id',requires=IS_NOT_EMPTY()),
 Field('account_id',requires=IS_NOT_EMPTY()),
 Field('first_name',requires=IS_NOT_EMPTY()),
 Field('last_name',requires=IS_NOT_EMPTY()),
 Field('email',requires=IS_NOT_EMPTY()))
