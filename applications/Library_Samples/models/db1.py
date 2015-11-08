# -*- coding: utf-8 -*-
db.define_table('accounts',
 Field('id',requires=IS_NOT_EMPTY()),
 Field('name',requires=IS_NOT_EMPTY()),
 Field('time_stamp','datetime'))
